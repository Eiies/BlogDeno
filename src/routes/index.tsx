import { Head } from "$fresh/runtime.ts";
import { Header } from "../components/Header.tsx";
import { Hero } from "../components/Hero.tsx";
import Wave from "../islands/Wave.tsx";
import { Article } from "../components/Article.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno</title>
      </Head>
      <body
        //  bg-fixed: 固定背景图 select-none: 禁用文本选中  bg-center: 水平垂直居中 bg-no-repea: 背景不重复平铺 bg-cover: 覆盖整个元素
        class="bg-[#78d4fc] font-mono bg-fixed select-none bg-center bg-no-repeat bg-cover"
        style="background-image: url(/mio.jpg)"
      >
        <Header />
        <main>
          <Hero />
          <Article />
          <Wave />
        </main>
      </body>
    </>
  );
}
