import { defineConfig } from "orval"

export default defineConfig({
  employee: {
    input: "./src/docs/user.yaml",
    output: {
      target: "./src/generated/user.ts",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
  rooms: {
    input: "./src/docs/room.yaml",
    output: {
      target: "./src/generated/room.ts",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
  categories: {
    input: "./src/docs/categories.yaml",
    output: {
      target: "./src/generated/categories.ts",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
  owners: {
    input: "./src/docs/owners.yaml",
    output: {
      target: "./src/generated/owners.ts",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
  bookings: {
    input: "./src/docs/bookings.yaml",
    output: {
      target: "./src/generated/bookings.ts",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
  pets: {
    input: "./src/docs/pets.yaml",
    output: {
      target: "./src/generated/pets.ts",
      override: {
        mutator: {
          path: "./src/lib/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
})
