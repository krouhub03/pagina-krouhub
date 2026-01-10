export default  function Footer() {
    return (
        <footer className="py-10 border-t border-white/5 bg-[#020617] text-center">
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} KrouHub Servicios Digitales.
            </p>
        </footer>
    );
}