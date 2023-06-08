const Box = ({
  status = 0,
  index = 0,
  onClick,
  numberOfBoxs,
  className = "",
}) => {
  return (
    <div className={`${className} flex justify-center min-w-[160px]`}>
      {status === 0 ? (
        <div
          className={`flex items-end ${
            numberOfBoxs < 6 ? "lg:h-[150px] xl:h-[200px]" : ""
          }`}
        >
          <img
            src="/images/box.png"
            className="object-bottom transform mx-auto transition duration-500 max-w-[200px] hover:scale-105"
            alt=""
            width={"80%"}
            onClick={onClick}
          />
        </div>
      ) : status === 1 ? (
        <div
          className={`flex items-end ${
            numberOfBoxs < 6 ? "lg:h-[150px] xl:h-[200px]" : ""
          }`}
        >
          <img
            src="/images/box_selected.png"
            className={`object-bottom transform transition duration-500 max-w-[200px]  
            ${numberOfBoxs === 2 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 4 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 6 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 12 ? "ml-[20px] mt-[3px]" : ""} hover:scale-105`}
            alt=""
            width={"80%"}
            onClick={onClick}
          />
        </div>
      ) : status === 2 ? (
        <div
          className={`flex items-end ${
            numberOfBoxs < 6 ? "lg:h-[150px] xl:h-[200px]" : ""
          }`}
        >
          <img
            src="/images/box_success.png"
            className={`object-bottom transform transition duration-500 max-w-[200px]  
            ${numberOfBoxs === 2 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 4 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 6 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 12 ? "ml-[20px] mt-[3px]" : ""} hover:scale-105`}
            alt=""
            width={"80%"}
            onClick={onClick}
          />
        </div>
      ) : (
        <div
          className={`flex items-end ${
            numberOfBoxs < 6 ? "lg:h-[150px] xl:h-[200px]" : ""
          }`}
        >
          <img
            src="/images/box_lost.png"
            className={`object-bottom transform transition duration-500 max-w-[200px] 
            ${numberOfBoxs === 2 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 4 ? "ml-[30px] " : ""}
            ${numberOfBoxs === 6 ? "ml-[30px] " : ""}
             ${
               numberOfBoxs === 12 ? "ml-[20px] mt-[3px]" : ""
             } hover:scale-105`}
            alt=""
            width={"80%"}
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

export default Box;
