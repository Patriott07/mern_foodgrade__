"use client";
import Link from "next/link";

const SettingPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="text-[24px] font-semibold">
                Apa yang anda ingin ubah?
            </div>

            <Link href="/dashboard/settings/account" className="rounded-lg shadow-xl p-6 max-w-[700px] border-t-2 border-slate-700 duration-200 hover:translate-y-[-8px] hover:border-green-600">
                <header className="pb-1 font-medium text-[24px] border-b-2 border-slate-800">
                    # Ubah Informasi Akun
                </header>
                <p className="font-medium mt-3">
                    Ubah Informasi pribadi anda dengan mudah dan cepat. perubahan yang anda lakukan bisa derdampak pada perubahan kebutuhan kalori dan air anda.
                </p>
            </Link>
            <Link href="/dashboard/settings/change_password" className="rounded-lg shadow-xl p-6 max-w-[700px] border-t-2 border-slate-700 duration-200 hover:translate-y-[-8px] hover:border-green-600">
                <header className="pb-1 font-medium text-[24px] border-b-2 border-slate-800">
                    # Ubah Kata Sandi
                </header>
                <p className="font-medium mt-3">
                    Ubah password dengan mudah dan cepat disini. pastikan anda mengingat password saat ini.
                </p>
            </Link>
            <Link href="/dashboard/settings/forget_password" className="rounded-lg shadow-xl p-6 max-w-[700px] border-t-2 border-slate-700 duration-200 hover:translate-y-[-8px] hover:border-green-600">
                <header className="pb-1 font-medium text-[24px] border-b-2 border-slate-800">
                    # Minta Sandi Baru
                </header>
                <p className="font-medium mt-3">
                    Tidak ingat kata sandi? its okey. System kami di lengkapi pemulihan password.
                </p>
            </Link>
        </div>
    )
}

export default SettingPage;