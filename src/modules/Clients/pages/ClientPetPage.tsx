import { CustomCheckbox } from "@/shared/ui/Checkbox"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Select } from "@/shared/ui/Select"
import { TextField } from "@/shared/ui/TextField"
import { DatePicker } from "@/widgets/DatePicker/DatePicker"
import { DATE_FRONT_FORMAT, TDatePickerProps } from "@/widgets/DatePicker/types"
import { FormControlLabel, FormLabel, IconButton, Radio } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { ReactNode, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { RadioGroup } from "@mui/material"

interface IForm {
  nickname: string
  breed: string
  dateOfBirth: string
  age?: string
  gender: string
  showDog: boolean
  color?: string
  specialSigns: string
  vaccine: string
  chronicDisease: "Yes" | "No" | ""
  chronicDiseaseType: string
}

export const ClientPetPage = () => {
  const [generalInfo, setShowGeneralInfo] = useState(false)
  const [healthInfo, setShowHealthInfo] = useState(false)
  const [behaviorInfo, setShowBehaviorInfo] = useState(false)
  const [foodInfo, setShowFoodInfo] = useState(false)
  // Состояние для календаря
  const [date, setDate] = useState(false)
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({ mode: "onChange" })

  // Отслеживание поля наличия хронич болезней для раздизейбла поля Какие болезни
  const chronicDisease = watch("chronicDisease")

  const submit = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    console.log(errors)
  })

  const handleDateChange = (selectedDate: Dayjs) => {
    setValue("dateOfBirth", selectedDate.format(DATE_FRONT_FORMAT))
    setDate(false)
    handleAgeChange(selectedDate.year())
  }

  const handleAgeChange = (age: number) => {
    let thisYear = new Date().getFullYear()
    let ageString = ""
    if (thisYear - age == 0) {
      ageString = 0 + " лет"
    } else if (thisYear - age == 1) {
      ageString = thisYear - age + " год"
    } else if (thisYear - age > 1 && thisYear - age <= 4) {
      ageString = thisYear - age + " года"
    } else {
      ageString = thisYear - age + " лет"
    }
    setValue("age", ageString)
  }

  return (
    <>
      <h1 className="text-2xl font-body font-bold">Создание нового питомца</h1>
      <div className="w-3/4 mt-6  border-black border-2">
        <div className="w-7/12 border-black border-2">
          <h2 className="text-xl font-body font-bold">Общая информация</h2>
          <form onSubmit={handleSubmit(submit)}>
            {/* не смог воспользоваться аргументом error у компонента TextField  и сделал кастомно*/}
            <TextField
              maxLength={30}
              {...register("nickname", {
                required: true,
                minLength: 2,
              })}
              style={
                errors?.nickname && { borderColor: "hsl(var(--destructive))" }
              }
              id="1"
              placeholder="Кличка*"
            />
            {(errors?.nickname?.type == "required" && (
              <p
                style={{ color: "hsl(var(--destructive))", marginLeft: "20px" }}
              >
                Пожалуйста, укажите кличку животного.
              </p>
            )) ||
              (errors?.nickname?.type == "minLength" && (
                <p
                  style={{
                    color: "hsl(var(--destructive))",
                    marginLeft: "20px",
                  }}
                >
                  Кличка питомца должна содержать минимум 2 буквенных символа
                </p>
              ))}
            <TextField
              maxLength={30}
              {...register("breed", {
                required: true,
                minLength: 2,
              })}
              style={
                errors?.breed && { borderColor: "hsl(var(--destructive))" }
              }
              id="2"
              placeholder="Порода*"
            />
            {(errors?.breed?.type == "required" && (
              <p
                style={{ color: "hsl(var(--destructive))", marginLeft: "20px" }}
              >
                Пожалуйста, укажите породу животного.
              </p>
            )) ||
              (errors?.breed?.type == "minLength" && (
                <p
                  style={{
                    color: "hsl(var(--destructive))",
                    marginLeft: "20px",
                  }}
                >
                  Порода питомца должна содержать минимум 2 буквенных символа
                </p>
              ))}
            <div className="flex w-full">
              <div className="relative mr-4">
                {/* Нужно добавить валидацию для поля при ручном вводе даты. Добавлять точки после числа, месяца */}
                <TextField
                  {...register("dateOfBirth", {
                    required: true,
                  })}
                  style={
                    errors?.dateOfBirth && {
                      borderColor: "hsl(var(--destructive))",
                    }
                  }
                  className="min-w-48"
                  id="3"
                  placeholder="Дата рождения*"
                />
                {errors?.dateOfBirth?.type == "required" && (
                  <p
                    style={{
                      color: "hsl(var(--destructive))",
                      marginLeft: "20px",
                    }}
                  >
                    Пожалуйста, введите дату рождения.
                  </p>
                )}
                <IconButton
                  style={{ position: "absolute", top: "29px", right: "22px" }}
                  onClick={() => {
                    setDate(!date)
                  }}
                >
                  <Icon type="CalendarIcon" height="20px" width="20px" />
                </IconButton>
                <div className="absolute left-64 -top-10 z-10">
                  <DatePicker
                    onClose={() => console.log("bob")}
                    isOpen={date}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="mr-4">
                {/* Нужно прокинуть сюда ошибку и подкрашивать бордер при ошибке */}
                <TextField
                  {...register("age", {})}
                  className="min-w-36"
                  id="4"
                  placeholder="Возраст"
                />
              </div>
              <div className="relative">
                <Select
                  className="min-w-52"
                  {...register("gender", {
                    required: true,
                  })}
                  data={[
                    { value: "М", label: "М" },
                    { value: "Ж", label: "Ж" },
                    { value: "Другое", label: "Другое" },
                  ]}
                  onChange={value => {
                    setValue("gender", value)
                  }}
                  renderValue={value => {
                    if (value) {
                      return value
                    }
                    return "Пол*"
                  }}
                />
                {errors?.gender?.type == "required" && (
                  <p
                    style={{
                      color: "hsl(var(--destructive))",
                      marginLeft: "20px",
                    }}
                  >
                    Пожалуйста, выберите пол.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-1">
              <Controller
                defaultValue={false}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomCheckbox
                    value={value}
                    onChange={onChange}
                    label="Выставочная собака"
                    labelPlacement="end"
                  />
                )}
                name="showDog"
              />
            </div>
            {generalInfo && (
              //Тут анимацию бы добавить! Для появления доп инпутов
              <div className="transition-transform ease-in-out delay-2000">
                <TextField
                  {...register("color")}
                  maxLength={30}
                  id="1"
                  placeholder="Окрас"
                />
                <TextField
                  {...register("specialSigns")}
                  maxLength={150}
                  id="1"
                  placeholder="Чип, клеймо, особые приметы"
                />
              </div>
            )}
            <div className="relative flex justify-center">
              {/* нужно добавить анимацию переворачивания стрелки - свг при клике */}
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
                {...register("vaccine")}
                maxLength={250}
                id="1"
                placeholder="Даты последних прививок, названия вакцин"
              />
              <div className="ml-5 mt-4">
                Есть ли хронические заболевания?
                <Controller
                  name="chronicDisease"
                  control={control}
                  defaultValue={""}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <RadioGroup row onChange={onChange} value={value}>
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Да"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="Нет"
                        />
                      </RadioGroup>
                    )
                  }}
                />
              </div>
              <TextField
                {...register("chronicDiseaseType")}
                // Здесь добавлено отслеживание поля о наличии заболеваний, используется watch из react-hook-form
                isDisabled={chronicDisease !== "Yes"}
                maxLength={500}
                id="2"
                placeholder="Какие хронические заболевания?"
              />

              {healthInfo && (
                <div className="relative">
                  <TextField
                    className=""
                    id="1"
                    placeholder="Дата последнего посещения ветврача"
                  ></TextField>
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "29px",
                      right: "22px",
                    }}
                    onClick={() => {
                      setDate(!date)
                    }}
                  >
                    <Icon type="CalendarIcon" height="20px" width="20px" />
                  </IconButton>
                  <div className="absolute left-64 -top-10 z-10">
                    <DatePicker
                      onClose={() => console.log("bob")}
                      isOpen={date}
                      onChange={handleDateChange}
                    />
                  </div>
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
            <button
              type="submit"
              style={{ height: "80px", width: "80px", background: "blue" }}
            />
          </form>
        </div>
      </div>
    </>
  )
}
