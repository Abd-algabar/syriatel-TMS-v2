
import api from "../axios";

export const getMyInterview = async () => {

  const response = await api.get("application/trainer/interview");

  console.log(response.data)
  return response.data
}

export const SetInterviewResult =async(id,formData)=>{ 
  console
  .log( "Body",formData)
  console.log(id)
  const response = await api.patch(`application/trainer/${id}/interview/result`,formData);
  console.log(response.data)
  return response.data
}


export const getMyTraineesApi =async()=>{ 
  const response = await api.get('trainee/trainer');
  // console.log(response.data)
  return response.data
}


export const createProgramApi =async(data)=>{ 
  const body ={
    title:data.name,
    description:data.description,
    deadline:data.endDate,
    phases:data.phases
  }
  const response = await api.post('program',body);
  console.log(response.data)
  return response.data
}

export const getMyProgramApi =async()=>{ 
  const response = await api.get('program/ownedPrograms');
  console.log(response.data)
  return response.data
}

export const getProgramApi =async(id)=>{ 
  const response = await api.get(`program/${id}`);
  console.log(response.data)
  return response.data
}

export const updateProgramApi =async(id,data)=>{ 
   const body ={
    title:data.name,
    description:data.description,
    deadline:data.endDate,
    phases:data.phases
  }
  const response = await api.put(`program/${id}`,body);
  console.log(response.data)
  return response.data
}


export const deleteProgramApi =async(id)=>{ 
  const response = await api.delete(`program/${id}`);
  console.log(response.data)
  return response.data
}


export const createTaskApi =async(phaseId,data)=>{ 
  
  const response = await api.post(`task/${phaseId}/tasks`,data);
  console.log(response.data)
  return response.data
}

export const getTaskApi =async(taskId)=>{ 
  
  const response = await api.get(`task/tasks/${taskId}`,);
  console.log(response.data)
  return response.data
}

export const createFeedbackApi =async(taskId,body)=>{ 
  const response = await api.post(`task/tasks/${taskId}/feedback`,body);
  console.log(response.data)
  return response.data
}


  