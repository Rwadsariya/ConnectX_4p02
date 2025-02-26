import { SignIn } from "@clerk/nextjs";

interface Props {
}

const Page = (props: Props) => {
  return (
    <SignIn />
  );
};

export default Page;