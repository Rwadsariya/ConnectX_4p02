import { onBoardUser } from "@/actions/users";
import { redirect } from "next/navigation";

interface Props {

}

const Page = async ({}: Props) => {
  // Server Action Onboard the user
  const user = await onBoardUser()
  if (user.status === 200 || user.status === 201) {
    return redirect(`dashboard/${user.data?.firstname}${user.data?.lastname}`)
  }
  
  return redirect('/sign-in')
};

export default Page;