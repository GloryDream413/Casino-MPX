const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      //   className="uppercase bg-gradient1 text-base py-4 px-8 border rounded-lg border-black  hover:shadow-md font-bold"
      className={`${className} uppercase py-4 px-8 flex items-center`}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};

export default Button;
