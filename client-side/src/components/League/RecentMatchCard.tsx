const RecentMatchCard = () => {
  return (
    <div className="border-[1px] border-primaryText py-[20px] max-w-[70%] mx-auto mt-[15px] rounded-[4px]">
      <div className="flex justify-between px-[10px]">
        <p className="text-primary text-[30px] mt-[2px]">Team 1</p>
        <p className="text-[35px]">VS</p>
        <p className="text-primary text-[30px] mt-[2px]">Team 2</p>
      </div>
      <p>League Match</p>
    </div>
  );
};

export default RecentMatchCard;
