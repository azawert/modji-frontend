import { CustomCheckbox } from "@/shared/ui/Checkbox"
import { Icon } from "@/shared/ui/Icon/Icon"
import { TextField } from "@/shared/ui/TextField"
import { IconButton } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const ClientPetPage = () => {
  const [generalInfo, setShowGeneralInfo] = useState(false)
  const [healthInfo, setShowHealthInfo] = useState(false)
  const [behaviorInfo, setShowBehaviorInfo] = useState(false)
  const [foodInfo, setShowFoodInfo] = useState(false)
  useForm()

  return (
    <>
      <h1 className="text-2xl font-body font-bold">Создание нового питомца</h1>
      <div className="w-3/4 mt-6  border-black border-2">
        <div className="w-7/12 border-black border-2">
          <h2 className="text-xl font-body font-bold">Общая информация</h2>
          <form action="">
            <TextField className="" id="1" placeholder="Кличка*"></TextField>
            <TextField className="" id="2" placeholder="Порода*"></TextField>
            <div className="flex w-full">
              <label className="relative mr-4">
                <TextField
                  className="min-w-48"
                  id="3"
                  placeholder="Дата рождения*"
                ></TextField>
                <IconButton
                  style={{ position: "absolute", top: "29px", right: "22px" }}
                >
                  <Icon type="CalendarIcon" height="20px" width="20px" />
                </IconButton>
              </label>
              <label className="mr-4">
                <TextField
                  className="min-w-36 "
                  id="4"
                  placeholder="Возраст"
                ></TextField>
              </label>
              <label className="relative">
                <TextField id="5" placeholder="Пол*"></TextField>
                <IconButton
                  style={{ position: "absolute", top: "29px", right: "5px" }}
                >
                  <Icon type="DownArrowIcon" height="20px" width="20px" />
                </IconButton>
              </label>
            </div>
            <div className="mt-1">
              <CustomCheckbox
                value={false}
                onChange={function (value: boolean): void {
                  throw new Error("Function not implemented.")
                }}
                label="Выставочная собака"
                labelPlacement="end"
              ></CustomCheckbox>
            </div>
            {generalInfo && (
              //Тут анимацию бы добавить! Для появления доп инпутов
              <div className="transition-transform ease-in-out delay-2000">
                <TextField className="" id="1" placeholder="Окрас"></TextField>
                <TextField
                  className=""
                  id="1"
                  placeholder="Чип, клеймо, особые приметы"
                ></TextField>
              </div>
            )}
            <div className="relative flex justify-center">
              <label style={{ color: "rgb(1, 69, 171)", cursor: "pointer" }}>
                {!generalInfo
                  ? "Отобразить все поля"
                  : "Скрыть дополнительные поля"}
                <IconButton
                  style={{ marginLeft: "-5px" }}
                  onClick={() => setShowGeneralInfo(!generalInfo)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.95 7.5L11.5167 12.9333C10.875 13.575 9.825 13.575 9.18333 12.9333L3.75 7.5"
                      stroke="rgb(1, 69, 171)"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
              </label>
            </div>
            <div>
              <h2 className="text-xl font-body font-bold">Здоровье</h2>
              <TextField
                className=""
                id="1"
                placeholder="Даты последних прививок, названия вакцин"
              ></TextField>

              <div>Есть ли хронические заболевания?</div>

              <TextField
                className=""
                id="2"
                placeholder="Какие хронические заболевания?"
              ></TextField>
              {healthInfo && (
                <div>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Дата последнего посещения ветврача"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Причина последнего посещения врача"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Дата обработки от глистов/паразитов"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Даты обработки от блох/клещей с указанием препарата"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Перенесенные операции (кастрация)"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Перенесенные заболевания"
                  ></TextField>
                  <div>Есть ли аллергия?</div>
                  <TextField
                    className=""
                    id="1"
                    placeholder="На что аллергия?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Перенесенные заболевания"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Контакты ветврача"
                  ></TextField>
                </div>
              )}
              <div className="relative flex justify-center">
                <label
                  style={{
                    color: "rgb(1, 69, 171)",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {!healthInfo
                    ? "Отобразить все поля"
                    : "Скрыть дополнительные поля"}
                  <IconButton
                    style={{ marginLeft: "-5px" }}
                    onClick={() => setShowHealthInfo(!healthInfo)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.95 7.5L11.5167 12.9333C10.875 13.575 9.825 13.575 9.18333 12.9333L3.75 7.5"
                        stroke="rgb(1, 69, 171"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </label>
              </div>
            </div>
            {/* Следующий блок */}
            <div>
              <h2 className="text-xl font-body font-bold">Поведение и уход</h2>
              <TextField
                className=""
                id="1"
                placeholder="Умеет ли оставаться один?"
              ></TextField>
              <TextField
                className=""
                id="2"
                placeholder="Требуется ли спец уход, какой?"
              ></TextField>
              <TextField
                className=""
                id="1"
                placeholder="Как относится к незнакомым людям?"
              ></TextField>
              <div>Прошел ли курс послушания?</div>
              <TextField
                className=""
                id="1"
                placeholder="Какой курс послушания прошел?"
              ></TextField>
              {behaviorInfo && (
                <div>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Есть ли опыт разлуки с хозяином?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Лает/воет в одиночестве?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Портит ли вещи, мебель?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Ворует ли еду со стола?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Справляет ли нужду дома?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Метит дома?"
                  ></TextField>
                  <div>Кусал ли кого-то когда-нибудь?</div>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Причина, почему кусал"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Играет/гуляет с другими собаками?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Любимые игрушки, игры"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Сколько раз в день привык гулять?/Гуляет ли на улице?"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder=" Утро. Привычное время прогулок"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="День. Привычное время прогулок"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Вечер. Привычное время прогулок"
                  ></TextField>
                </div>
              )}
              <div className="relative flex justify-center">
                <label
                  style={{
                    color: "rgb(1, 69, 171)",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {!behaviorInfo
                    ? "Отобразить все поля"
                    : "Скрыть дополнительные поля"}
                  <IconButton
                    style={{ marginLeft: "-5px" }}
                    onClick={() => setShowBehaviorInfo(!behaviorInfo)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.95 7.5L11.5167 12.9333C10.875 13.575 9.825 13.575 9.18333 12.9333L3.75 7.5"
                        stroke="rgb(1, 69, 171"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-body font-bold">Питание</h2>
              <TextField
                className=""
                id="1"
                placeholder="Вид корма (сухой/натуралка/консервы)"
              ></TextField>
              {foodInfo && (
                <div>
                  <div>Количество кормлений в день</div>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Название корма/консервов"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Состав корма/консервов"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Норма на 1 кормление"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Особенности кормления"
                  ></TextField>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Разрешенные лакомства и их количество"
                  ></TextField>
                  <div>Необходимы лекарства, витамины?</div>
                  <TextField
                    className=""
                    id="1"
                    placeholder="Название, режим приема лекарств/витаминов и доза"
                  ></TextField>
                </div>
              )}
              <div className="relative flex justify-center">
                <label
                  style={{
                    color: "rgb(1, 69, 171)",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {!foodInfo
                    ? "Отобразить все поля"
                    : "Скрыть дополнительные поля"}
                  <IconButton
                    style={{ marginLeft: "-5px" }}
                    onClick={() => setShowFoodInfo(!foodInfo)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.95 7.5L11.5167 12.9333C10.875 13.575 9.825 13.575 9.18333 12.9333L3.75 7.5"
                        stroke="rgb(1, 69, 171"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-body font-bold">
                Дополнительная информация
              </h2>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="Дополнительные комментарии, особенности поведения"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
