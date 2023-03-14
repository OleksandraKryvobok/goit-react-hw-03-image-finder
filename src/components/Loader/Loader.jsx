import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
    return (
        <ThreeCircles
            height="70"
            width="70"
            color="#bfbfbf"
            wrapperStyle={{
                margin: '0 auto',
                padding: '70px'
            }}
            visible={true}
            ariaLabel="three-circles-rotating"
        />
    );
};

export default Loader;