
export interface OwnerShortDt {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface PetDt {
    name: string;
    birthDate?: string;
    breed?: string;
    color?: string;
    sex?: string;
    ownerShortDt: OwnerShortDt;
}

export interface BookingDt {
    id: number;
    PetDt: PetDt;
}



