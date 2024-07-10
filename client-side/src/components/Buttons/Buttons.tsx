type IAuthButtonProps = {
  name: string;
};

export const PrimaryButton = ({ name }: IAuthButtonProps) => {
  return (
    <div className="text-white border-[1px] border-white max-h-[50px] bg-primary rounded-[6px] p-[10px] px-[20px] min-w-[120px] max-w-[200px] text-center duration-300 ease-out hover:bg-white hover:text-primary hover:border-primary cursor-pointer mx-auto">
      {name}
    </div>
  );
};

export const SecondaryButton = ({ name }: IAuthButtonProps) => {
  return (
    <div className="text-primary border-[1px] border-primary max-h-[50px] bg-white rounded-[6px] p-[10px] px-[20px] min-w-[120px] max-w-[200px] duration-300 ease-out hover:bg-primary hover:text-white hover:border-white cursor-pointer mx-auto">
      {name}
    </div>
  );
};
