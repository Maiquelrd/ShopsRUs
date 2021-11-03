export function GetResponse(data,response){
    return response.status(data.status).json(data);
}