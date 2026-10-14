import { useCallback, useEffect, useState } from "react";
import {getSupervisorsApi ,createSupervisorsApi} from "../../Api/HrApi/SupervisorsApi"
import { fireTraineeApi, getAllTraineesApi } from "../../Api/HrApi/traineesApi";


export default function useTrainees() {
  const [trainees, setTrainees] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loading,setLoading]=useState(true)
  const [refreshing, setRefreshing] = useState(false);


  const getTrainees = useCallback(async (silent = false) => {

     if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
        const data= await  getAllTraineesApi();
        setTrainees(data.data)
        // console.log("su:", supervisors)
     
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "error";
      console.error("Error fetching programs:", message);
      throw error;
    }finally{
      if (silent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);


    const fireTrainee = useCallback(async (id,reason) => {
    // setLoadingCreate(true)
    try {
        const data= await  fireTraineeApi(id,reason);
        console.log("csu:", data)
        await getTrainees(true)

        return data
     
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "error";
      console.error("Error fetching programs:", message);
      throw error;
    }finally{
      // setLoadingCreate(false)
    }
  }, []);

 

  useEffect(() => {
    getTrainees();
  }, []);

  return {
    // operation
    getTrainees,
    fireTrainee,
    // loading
    loading,
    loadingCreate,
    refreshing,
    // state
    trainees
  };
}
