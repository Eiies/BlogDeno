export function Footer() {
  return (
    <footer class="text-gray-600 body-font bg-red-300">
      <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a
          href="#"
          class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
        >
          <img src="/logo.svg" alt="" />
          <span class="ml-3 text-xl">Eiies</span>
        </a>
        <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 Eiies —
          <a
            href="#"
            class="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Eiies
          </a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href={"https://github.com"} class="text-gray-500">
            <img src="/github.svg" alt="" />
          </a>
          <a href="#" class="text-gray-500">
            <img src="/bilibili.svg" alt="" />
          </a>
        </span>
      </div>
    </footer>
  );
}
