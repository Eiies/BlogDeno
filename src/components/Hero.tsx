export function Hero() {
  return (
    //  使用 justify-center 和 items-center 来居中
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex-grow"></div>

      <img
        className="opacity-50 animate-bounce pb-5"
        src="/arrow.svg"
        width="250"
        height="250"
        alt="arrow"
      />
    </div>
  );
}
