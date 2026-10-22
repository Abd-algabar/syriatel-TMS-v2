import api from "../axios";

export const getDashboardDataApi = async () => {
  const response = await api.get("dashboard/hr");
  console.log(response.data)
  return response.data;
};

export const getAllEvaluationApi = async () => {
  const response = await api.get("evaluation/allEvaluations");
  console.log(response.data)
  return response.data;
};
