import Breadcrumb from '../components/common/Breadcrumb'
import usePageMeta from '../hooks/usePageMeta'
import { kktTeam } from '../data/timKkt'

export default function KktTeamPage() {
  usePageMeta('Tim KKT | Kelurahan Matani 2', 'Informasi Tim KKT 149 Posko Matani 2.')

  return (
    <>
      <header className="border-b border-gray-200 bg-[#f7f4ee] py-10 md:py-14"><div className="container-page"><Breadcrumb current="Tim KKT" /><div className="mt-9 border-t border-ink/15 pt-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Kontributor Website</p><h1 className="mt-4 text-4xl font-bold text-ink md:text-5xl">{kktTeam.name}</h1><p className="mt-5 max-w-2xl border-l-2 border-primary pl-4 leading-7 text-gray-600">{kktTeam.description}</p></div></div></header>
      <main className="container-page py-16 md:py-24"><section className="border-y border-ink/15 py-8 md:py-10"><div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{kktTeam.collaborationLabel}</p><h2 className="mt-3 font-heading text-3xl font-bold text-ink">Karya bersama untuk Matani 2.</h2></div><div className="border-l-2 border-primary pl-5"><p className="leading-8 text-gray-600">{kktTeam.collaborationText}</p><div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.12em]"><span className="border border-ink/15 bg-white px-3 py-2 text-ink">Universitas Sam Ratulangi</span><span className="border border-ink/15 bg-white px-3 py-2 text-ink">KKT Posko Matani 2</span><span className="border border-ink/15 bg-white px-3 py-2 text-ink">Kelurahan Matani 2</span></div></div></div></section>
        <section className="mt-12"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Anggota Tim</p><h2 className="mt-2 font-heading text-3xl font-bold text-ink">Daftar Kontributor</h2></div><span className="text-sm font-semibold text-gray-500">{kktTeam.members.length} anggota tercatat</span></div>{kktTeam.members.length > 0 ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{kktTeam.members.map((member) => <article key={member.name} className="overflow-hidden border border-gray-200 bg-white shadow-sm"><div className="aspect-[4/3] overflow-hidden bg-gray-100">{member.photo && <img src={member.photo} alt={`Foto ${member.name}`} className="h-full w-full object-cover object-top" />}</div><div className="border-t-2 border-primary p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{member.role}</p><h3 className="mt-3 font-heading text-xl font-bold text-ink">{member.name}</h3></div></article>)}</div> : <div className="mt-7 border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">Daftar anggota Tim KKT akan ditambahkan.</div>}</section>
      </main>
    </>
  )
}
