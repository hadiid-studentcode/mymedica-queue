export default function HomePage() {
  return (
    <div className="flex flex-col justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="">
        <div className="bg-white p-8 shadow-2xl rounded-xl transition duration-300 hover:shadow-3xl">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Selamat Datang di
            </h2>
            <h1 className="mt-2 text-6xl font-black text-indigo-700 tracking-tighter sm:text-7xl">
              MyMedica-Queue
            </h1>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xl text-gray-600 leading-relaxed">
              Sistem antrian digital terdepan untuk layanan kesehatan Anda.
            </p>
            <p className="mt-2 text-xl font-medium text-gray-700">
              Pengalaman berobat kini lebih mudah, cepat, dan terorganisir.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyMedica-Queue. Semua hak dilindungi.
      </footer>
    </div>
  );
}
