import { atom } from "recoil";

interface Contact{
    id: number;
    name: string;
    email: string;
    phone: string;
}

export const contactState = atom<Contact[]>({
    key: 'contactState',
    default: [],
});