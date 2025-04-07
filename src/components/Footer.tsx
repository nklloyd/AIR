export default function Footer() {
    return (
      <footer className="bg-gray-100  text-center py-6 mt-8">
        <div className="flex justify-center items-center gap-4">
          <span className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AIR.
          </span>
          <img 
            src="/Air Logo.png" 
            alt="Air Logo"
            style={{ height: "60px", width: "auto" }}/>
      </div>
      </footer>
    );
  }
  