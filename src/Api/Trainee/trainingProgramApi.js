import api from "../axios";

export const getTrainingProgram = async () => {
    const response = await api.get("myProgram");
    console.log(response.data)
    return response.data
}