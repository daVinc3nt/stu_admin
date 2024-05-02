import { LeakAddTwoTone } from "@mui/icons-material";
import { columns } from "./column";
import { DataTable } from "./datatable";
import {  FindingTeacherInfoByAdmin,  TeacherOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie";
const conditions: FindingTeacherInfoByAdmin[] = [];
async function getData(): Promise<any> {
  // Fetch data from your API here.p
  const myToken: token = {
    token: cookie.get("token"),
  };
  const teacher= new TeacherOperation()
  console.log(cookie.get("token"))
  const res = await teacher.findByAdmin(conditions[0],myToken) 
  console.log(res)
  // const data = await res.json();
  // console.log(res1)
  // console.log(data)
  // console.log(res1)  
  return res.data;
}
export default async function DemoPage(reloadData:any) {
  // const test = useContext(UserContext)
  console.log(cookie.get("token"))
  const data = await getData();
  if (data)
    return(
      <div>
        <DataTable columns={columns} data={data} reload={reloadData}/>
      </div>
    )
  else 
    return(
      <div className="text-xl flex items-center">
        Lỗi xảy ra vui lòng thử lại!
      </div>
  )
}
