import { useCallback, useState } from "react"
import { RoomsPageTitle } from "../components/RoomsPageTitle"
import { ETextType, Link } from "@/shared/ui/Link"
import { cn } from "@/lib/utils"
import { Divider } from "@mui/material"
import { useGetAllRooms } from "../api/queries"
import { RoomsPageBody } from "../components/RoomsPageBody"
import { RoomDeleteModal } from "../components/RoomDeleteModal"
import { NewRoomDto, RoomDto } from "@/generated/room"
import {
  useCreateRoom,
  useHideRoom,
  useUnHideRoom,
  useUpdateRoom,
} from "../api/mutation"
import { useQueryClient } from "@tanstack/react-query"
import { EQueryKeys } from "../api/keys"
import { useForm } from "react-hook-form"
import { TOpenModal } from "@/shared/types/types"
import { RoomCreateOrEditModal } from "../components/RoomCreateOrEditModal"

export enum EPageMode {
  ACTIVE = "Действующие",
  DELETED = "Удаленные",
}

export type TTabsForMode = {
  value: boolean
  label: EPageMode
}

const tabs: TTabsForMode[] = [
  { label: EPageMode.ACTIVE, value: true },
  { label: EPageMode.DELETED, value: false },
]

type TModalDeleteData = {
  roomCategory: string | undefined
  roomNumber: string | undefined
  id: number
}

export type TRoomCreateForm = {
  category: string
  number: string
  area: string
  description: string
}

export const RoomsPage: React.FC = () => {
  const queryClient = useQueryClient()
  const [selectedMode, setSelectedMode] = useState<TTabsForMode>(tabs[0])
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false)
  const [deleteModalData, setDeleteModalData] = useState<TModalDeleteData>()
  const [editModalData, setEditModalData] = useState<RoomDto>()
  const [isCreateOrEditModalOpened, setIsCreateOrEditModalOpened] =
    useState<TOpenModal>({ isOpen: false, isEdit: false })

  const { data: rooms, isLoading: isRoomsLoading } = useGetAllRooms(
    selectedMode.label
  )
  const { mutate: hideRoom } = useHideRoom()
  const { mutate: unHideRoom } = useUnHideRoom()
  const { mutate: createRoom } = useCreateRoom()
  const { mutate: updateRoom } = useUpdateRoom()

  const form = useForm<TRoomCreateForm>({
    mode: "all",
    defaultValues: {
      area: "",
      description: "",
      category: "",
      number: "",
    },
  })

  const handleChangeMode = (mode: string) => {
    const selected = tabs.find(tab => tab.label === mode)
    if (selected) {
      setSelectedMode(selected ?? tabs[0])
      queryClient.invalidateQueries({
        queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${selected.label}`],
      })
    }
  }
  const handleDeleteModalOpened = useCallback((room: RoomDto) => {
    setIsDeleteModalOpened(true)
    setDeleteModalData(prev => ({
      ...prev,
      id: room.id,
      roomCategory: room.categoryDto?.name,
      roomNumber: room.number,
    }))
  }, [])
  const handleDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpened(false)
  }, [])

  const handleHideRoom = useCallback(() => {
    if (!deleteModalData?.id) return
    hideRoom(deleteModalData?.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${selectedMode.label}`],
        })
        handleDeleteModalClose()
      },
    })
  }, [
    deleteModalData?.id,
    handleDeleteModalClose,
    hideRoom,
    queryClient,
    selectedMode.label,
  ])

  const handleUnHideRoom = useCallback(
    (id: number) => {
      unHideRoom(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${selectedMode.label}`],
          })
        },
      })
    },
    [unHideRoom, queryClient, selectedMode.label]
  )
  const handleOpenCreateModal = useCallback(() => {
    setIsCreateOrEditModalOpened({ isOpen: true, isEdit: false })
  }, [])

  const handleOpenEditModal = useCallback((room: RoomDto) => {
    setIsCreateOrEditModalOpened(prev => ({
      ...prev,
      isEdit: true,
      isOpen: true,
    }))

    setEditModalData(prev => ({ ...prev, ...room }))
  }, [])
  const handleCloseCreateOrEditModal = useCallback(() => {
    setIsCreateOrEditModalOpened(prev => ({ ...prev, isOpen: false }))
    form.reset()
  }, [form])

  const handleCreateOrUpdateRoom = useCallback(
    (room: NewRoomDto) => {
      isCreateOrEditModalOpened.isEdit
        ? updateRoom(
            {
              id: editModalData?.id || 0,
              data: room,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: [
                    `${EQueryKeys.GET_ALL_ROOMS} ${selectedMode.label}`,
                  ],
                })
                handleCloseCreateOrEditModal()
              },
            }
          )
        : createRoom(room, {
            onSuccess: () => {
              handleCloseCreateOrEditModal()
              queryClient.invalidateQueries({
                queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${selectedMode.label}`],
              })
            },
          })
    },
    [
      createRoom,
      editModalData?.id,
      handleCloseCreateOrEditModal,
      isCreateOrEditModalOpened.isEdit,
      queryClient,
      selectedMode.label,
      updateRoom,
    ]
  )

  return (
    <>
      <RoomsPageTitle onClick={handleOpenCreateModal} />
      <div className="mb-[3px]">
        {tabs.map((tab, idx) => (
          <Link
            textType={ETextType.NORMAL}
            isActive={selectedMode.label === tab.label}
            onClick={() => handleChangeMode(tab.label)}
            key={tab.label}
            className={cn({ ["mr-2"]: idx + 1 !== tabs.length })}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <Divider sx={{ marginBottom: "20px" }} />
      <RoomsPageBody
        handleBackFromArchive={handleUnHideRoom}
        handleOpenDeleteModal={handleDeleteModalOpened}
        handleOpenEditModal={handleOpenEditModal}
        isLoading={isRoomsLoading}
        mode={selectedMode.label}
        rooms={rooms || []}
      />
      <RoomDeleteModal
        isOpen={isDeleteModalOpened}
        onCancel={handleDeleteModalClose}
        onConfirm={handleHideRoom}
        roomCategory={deleteModalData?.roomCategory}
        roomNumber={deleteModalData?.roomNumber}
      />
      <RoomCreateOrEditModal
        isOpen={isCreateOrEditModalOpened.isOpen}
        form={form}
        onClose={handleCloseCreateOrEditModal}
        isEditing={isCreateOrEditModalOpened.isEdit}
        editRoomData={editModalData}
        handleFormSubmit={handleCreateOrUpdateRoom}
      />
    </>
  )
}
