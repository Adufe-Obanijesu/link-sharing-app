import { HandleFormType } from "@/types/form";

export const handleForm: HandleFormType = (e, data, setData) => {
    e.preventDefault();

    setData({
        ...data,
        [e.target.name]: e.target.value,
    })
}