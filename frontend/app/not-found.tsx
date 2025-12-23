import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-6">
      <section className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex items-center justify-center p-8" style={{ backgroundColor: '#97d22a' }}>
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-black">QuincenaToGo</h2>
              <p className="mt-2 text-sm text-black/80">Adelantos rápidos y simples</p>
            </div>
          </div>

          <div className="md:w-2/3 p-10">
            <div className="flex items-start gap-6">
              <div className="text-6xl font-extrabold text-black">404</div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Página no encontrada</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Lo sentimos, no pudimos encontrar la página que buscas. Quizás el enlace esté roto o la página fue movida.</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-[#017eff] text-white rounded-md shadow-sm hover:bg-[#0168e6]">Volver al inicio</Link>
                  <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 border border-[#DEDEDE] text-slate-800 rounded-md hover:bg-slate-50">Explorar sitio</Link>
                </div>

                <div className="mt-4 text-sm text-slate-500">Si necesitas ayuda, envía un email a <a href="mailto:soporte@quincenatogo.com" className="text-[#017eff]">soporte@quincenatogo.com</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
