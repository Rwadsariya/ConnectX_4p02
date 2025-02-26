import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

interface LoaderProps {
    state: Boolean
    classname?: String
    children: React.ReactNode  
    color?: String
}

const Loader = ({state, classname, children, color}: LoaderProps) => {
    return state ? <div className={cn("",classname)}>
        <Spinner size="md" color={"primary"} />
    </div> : (
        children
    )
};

export default Loader;