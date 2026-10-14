import { useCallback, useEffect, useState } from "react";
import { TrainerAcceptOrRejectApplicationApi } from "../../Api/SupervisorApi/assignedApi";
import {
  deleteProgramApi,
  getMyProgramApi,
  getMyTraineesApi,
  getProgramApi,
  getTaskApi,
} from "../../Api/SupervisorApi/supervisorApi";

export default function useAssigned() {
  const [loadingAction, setLoadingAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [myTrainees, setMyTrainees] = useState([]);
  const [myPrograms, setMyPrograms] = useState([]);
  const [program, setProgram] = useState("");
  const [task,setTask]=useState("")

  const TrainerAcceptOrRejectApplication = useCallback(
    async (applicationId, type) => {
      setLoadingAction(`${type}-${applicationId}`);

      try {
        const data = await TrainerAcceptOrRejectApplicationApi(
          applicationId,
          type,
        );

        setLoadingAction("");
        return data;
      } catch (error) {
        console.log(error);
        setError(error);
        setLoadingAction("");
      }
    },
    [],
  );

  const getMyTrainees = useCallback(async (silent=false) => {
    if (!silent) {
      setLoading(true);  
    }
    try {
      const data = await getMyTraineesApi();
      setMyTrainees(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyPrograms = useCallback(async (silent=false) => {
    if (!silent) {
        setLoading(true);
    }
    try {
      const data = await getMyProgramApi();
      setMyPrograms(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
      throw error
    } finally {
      setLoading(false);
    }
  }, []);

  const getProgram = useCallback(async (id) => {
    setLoadingAction(id);
    try {
      const data = await getProgramApi(id);
      setProgram(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoadingAction('');
    }
  }, []);


  const deleteProgram = useCallback(async (id) => {
    setLoadingAction(id);
    try {
      const data = await deleteProgramApi(id);
      console.log("delete",data)
      await getMyPrograms(true)
      return data.message
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoadingAction('');
    }
  }, []);


    const getTask = useCallback(async (taskId,silent=false) => {
    if (!silent) {
      setLoading(true);  
    }
    try {
      const data = await getTaskApi(taskId);
      setTask(data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  

  return {
    // loading
    loading,
    loadingAction,

    // operation
    TrainerAcceptOrRejectApplication,
    getMyTrainees,
    getMyPrograms,
    getProgram,
    deleteProgram,
    getTask,
    // error
    error,

    // data
    myTrainees,
    myPrograms,
    program,
    task
  };
}
