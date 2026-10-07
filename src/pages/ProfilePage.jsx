import Breadcrumb from '../components/common/Breadcrumb'
import usePageMeta from '../hooks/usePageMeta'
import { profileData } from '../data/profil'
import { organization as defaultOrganization } from '../data/pemerintahan'
import { useContent } from '../context/ContentContext'

function OrganizationCard({ title, name, nip }) {
  const filled = Boolean(name)

  return (
    <article className="relative rounded-lg border border-gray-300 bg-white p-5 text-center shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{title}</p>
      <p className={`mt-3 font-heading text-base font-bold ${filled ? 'text-ink' : 'text-gray-400'}`}>{filled ? name : 'Belum diisi'}</p>
      {nip && <p className="mt-1 text-xs text-gray-500">NIP. {nip}</p>}
    </article>
  )
}

export default function ProfilePage() {
  usePageMeta('Profil | Kelurahan Matani 2', 'Profil Kelurahan Matani 2, Kecamatan Tomohon Tengah, Kota Tomohon, Sulawesi Utara.')
  const { content } = useContent()
  const organization = content.organization || defaultOrganization
  const [, , total, families, neighborhoods] = profileData.population
  const latestOfficial = profileData.officialHistory.at(-1)
  const landAreas = profileData.landUse.map(([, value]) => Number(value.replace(/[^0-9,]/g, '').replace(',', '.')))
  const landTotal = landAreas.reduce((sum, value) => sum + value, 0)

  return (
    <>
      <header className="border-y border-ink/10 bg-[#f7f4ee] py-9 md:py-12">
        <div className="container-page">
          <Breadcrumb current="Profil" />
          <div className="mt-9 border-t border-ink/15 pt-7">
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-6xl">Kelurahan<br /><span className="text-primary">Matani 2</span></h1>
            <p className="mt-6 max-w-3xl border-l-2 border-primary pl-4 text-base leading-7 text-gray-600 md:text-lg">Kelurahan Matani 2 merupakan wilayah administratif di Kecamatan Tomohon Tengah, Kota Tomohon, Provinsi Sulawesi Utara. Wilayah ini menggunakan kode pos <span className="font-semibold text-ink">95444</span>.</p>
          </div>
        </div>
      </header>

      <main className="pb-20 md:pb-28">
        <section className="container-page mt-8"><div className="border-y border-ink/15 bg-white">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">{[[total[1], 'Total Penduduk'], [families[1], 'Kepala Keluarga'], [neighborhoods[1], 'Lingkungan'], ['± 536,5 Ha', 'Area Tercatat']].map(([value, label], index) => <div key={label} className={`relative px-6 py-6 md:px-7 ${index < 3 ? 'border-b border-ink/10 sm:border-r lg:border-b-0' : ''}`}><span className="absolute right-5 top-5 font-heading text-4xl font-bold text-ink/5">0{index + 1}</span><p className="relative text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">{label}</p><p className="relative mt-4 font-heading text-2xl font-bold text-ink">{value}</p><div className="relative mt-4 h-px w-8 bg-primary" /></div>)}</div>
          <p className="border-t border-ink/10 px-6 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">Ringkasan administrasi Kelurahan Matani 2</p>
        </div></section>

        <section className="container-page mt-12 grid overflow-hidden border border-gray-200 bg-white shadow-sm lg:mt-16 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="relative bg-[#faf9f7] p-7 md:p-10">
            <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Identitas Wilayah</p><h2 className="mt-3 font-heading text-3xl font-bold text-ink">Mengenal Matani 2</h2><p className="mt-4 max-w-md leading-7 text-gray-600">Kelurahan Matani 2 merupakan bagian dari Kecamatan Tomohon Tengah, Kota Tomohon, Provinsi Sulawesi Utara.</p>
            <div className="relative mt-9 space-y-0 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-gray-200">{profileData.identity.map(([label, value], index) => <div key={label} className="relative flex items-center gap-4 py-3"><span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-bold text-primary">{String(index + 1).padStart(2, '0')}</span><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{label}</p><p className="mt-1 font-semibold leading-5 text-ink">{value}</p></div></div>)}</div>
          </article>
          <article className="border-t border-gray-200 bg-white p-7 md:p-10 lg:border-l lg:border-t-0">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Penggunaan Lahan</p><h2 className="mt-3 font-heading text-3xl font-bold text-ink">Komposisi Wilayah</h2></div><div className="border-l-2 border-primary pl-3"><p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Area tercatat</p><p className="mt-1 font-heading text-xl font-bold text-ink">± {landTotal.toLocaleString('id-ID')} Ha</p></div></div>
            <div className="mt-10 space-y-6">{profileData.landUse.map(([label, value], index) => <div key={label}><div className="flex items-end justify-between gap-4"><div className="flex items-center gap-3"><span className="text-xs font-bold text-primary">0{index + 1}</span><p className="font-semibold text-ink">{label}</p></div><p className="font-heading text-xl font-bold text-ink">{value}</p></div><div className="mt-3 h-2 overflow-hidden bg-gray-100"><div className="h-full bg-primary" style={{ width: `${(landAreas[index] / landTotal) * 100}%` }} /></div><p className="mt-1.5 text-right text-[10px] font-medium text-gray-400">{((landAreas[index] / landTotal) * 100).toFixed(1)}% dari area tercatat</p></div>)}</div>
          </article>
        </section>

        <section className="container-page mt-14 lg:mt-20">
          <div className="grid gap-8 border-y border-ink/15 py-10 lg:grid-cols-[0.72fr_1.28fr] lg:py-14">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Riwayat Wilayah</p><h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-ink md:text-4xl">Sejarah<br />Matani 2</h2><p className="mt-5 max-w-sm leading-7 text-gray-600">Jejak perjalanan Matani 2 dari tradisi lisan Nimawanua hingga menjadi kelurahan.</p><div className="mt-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400"><span className="h-px w-10 bg-primary" />Tradisi lisan & catatan pemerintahan</div></div>
            <div className="relative border-l border-ink/15 pl-7 md:pl-10">{profileData.history.map((event, index) => <article key={`${event.period}-${event.title}`} className="relative pb-9 last:pb-0"><span className="absolute -left-[35px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[#f7f4ee] bg-primary md:-left-[47px]" /><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"><h3 className="font-heading text-xl font-bold text-ink">{event.title}</h3><p className="w-fit border-b border-primary/40 pb-1 text-xs font-bold text-primary">{event.period}</p></div><p className="mt-3 leading-7 text-gray-600">{event.description}</p>{index < profileData.history.length - 1 && <div className="mt-6 h-px w-full bg-gray-100" />}</article>)}</div>
          </div>
        </section>

        <section className="container-page mt-14 lg:mt-20">
          <div className="mx-auto max-w-5xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Pemerintahan Kelurahan</p><h2 className="mt-3 font-heading text-3xl font-bold text-ink md:text-4xl">Struktur Organisasi Kelurahan Matani Dua</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Kecamatan Tomohon Tengah, Kota Tomohon. Informasi jabatan yang belum terisi dapat diperbarui melalui dashboard admin.</p></div>
          <div className="relative mt-10 border border-gray-200 bg-gray-50 p-5 shadow-sm md:p-8 lg:p-10">
            <div className="mx-auto max-w-xs"><OrganizationCard title="Lurah" name={organization.headName} nip={organization.headNip} /></div>
            <div className="mx-auto h-7 w-px bg-gray-300" />
            <div className="grid gap-4 md:grid-cols-2 md:items-center"><OrganizationCard title="Kelompok Jabatan Fungsional" name="" /><OrganizationCard title="Sekretaris" name={organization.secretaryName} nip={organization.secretaryNip} /></div>
            <div className="mx-auto h-8 w-px bg-gray-300" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <OrganizationCard title="Kasie Pemerintahan & Trantib" name={organization.governmentName} nip={organization.governmentNip} />
              <OrganizationCard title="Kasie Pembangunan" name={organization.developmentName} nip={organization.developmentNip} />
              <OrganizationCard title="Kasie Keuangan" name={organization.financeName} nip={organization.financeNip} />
              <OrganizationCard title="Kasie Kesra" name={organization.welfareName} nip={organization.welfareNip} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <OrganizationCard title="Pemb. Kasie Pemerintahan & Trantib" name={organization.governmentAssistantName} />
              <OrganizationCard title="Pemb. Kasie Pembangunan" name={organization.developmentAssistantName} />
              <OrganizationCard title="JFU / Bendahara" name={organization.financeAssistantName} />
              <OrganizationCard title="JFU" name={organization.welfareAssistantName} />
            </div>
          </div>
        </section>

        <section className="container-page mt-14 lg:mt-20">
          <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="border border-gray-200 bg-white p-7 shadow-sm md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Jejak Kepemimpinan</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-ink">Hukum Tua & Lurah Matani Dua</h2>
              <p className="mt-5 leading-7 text-gray-600">Riwayat pejabat yang tercantum pada papan informasi Kelurahan Matani Dua, Kecamatan Tomohon Tengah, Kota Tomohon.</p>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">Entri terakhir pada papan</p>
                <p className="mt-2 font-heading text-xl font-bold text-ink">{latestOfficial.name}</p>
                <p className="mt-1 text-sm text-gray-600">{latestOfficial.title} · {latestOfficial.period}</p>
              </div>
            </div>

            <article className="overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-100 px-6 py-6 md:px-8">
                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Arsip Kepemimpinan</p><h3 className="mt-2 font-heading text-2xl font-bold text-ink">Daftar Pejabat</h3></div>
                <span className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-600">{profileData.officialHistory.length} periode tercatat</span>
              </div>
              <div className="max-h-[620px] overflow-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-[#fcfbfb] text-xs uppercase tracking-[0.1em] text-gray-500"><tr><th className="w-16 px-6 py-4 font-bold">No.</th><th className="px-4 py-4 font-bold">Nama Pejabat</th><th className="px-4 py-4 font-bold">Jabatan</th><th className="px-4 py-4 font-bold">Tahun</th><th className="px-6 py-4 font-bold">Wilayah</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">{profileData.officialHistory.map((official, index) => <tr key={`${official.name}-${official.period}`} className="transition hover:bg-red-50/50"><td className="px-6 py-4 font-bold text-primary">{String(index + 1).padStart(2, '0')}</td><td className="px-4 py-4 font-semibold text-ink">{official.name}</td><td className="px-4 py-4"><span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">{official.title}</span></td><td className="px-4 py-4 font-medium text-gray-600">{official.period}</td><td className="px-6 py-4 text-gray-600">{official.area}</td></tr>)}</tbody>
                </table>
              </div>
            </article>
          </div>
          <p className="mt-4 text-xs leading-5 text-gray-500">* Keterangan “sekarang” mengikuti isi pada papan informasi yang didokumentasikan. Mohon perbarui apabila terdapat perubahan pejabat atau periode jabatan.</p>
        </section>
      </main>
    </>
  )
}
