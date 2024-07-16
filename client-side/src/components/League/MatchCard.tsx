const MatchCard = () => {
  return (
    <div className="border-[1px] border-primaryText py-[20px] max-w-[70%] mx-auto mt-[15px] rounded-[4px]">
      <div className="flex justify-between px-[10px]">
        <p className="text-primary text-[30px] mt-[40px]">Team 1</p>
        <div>
          <p className="text-[25px]">120'</p>
          <div className="flex text-[35px]">
            <div>
              <p>3</p>
              {/* <p className="text-[20px] -mt-[15px]">(4)</p> */}
            </div>
            <p className="ml-[5px] mr-[5px]">:</p>
            <div>
              <p>2</p>
              {/* <p className="text-[20px] -mt-[15px]">(2)</p> */}
            </div>
          </div>
          <p className="text-[25px]"></p>
        </div>
        <p className="text-primary text-[30px] mt-[40px]">Team 2</p>
      </div>
      <p>League Match</p>
    </div>
  );
};

export default MatchCard;
