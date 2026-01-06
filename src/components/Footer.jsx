function Footer() {
  return (
    <footer className="bg-[#b26363] text-white py-10 px-8 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* <img src="https://images.squarespace-cdn.com/content/v1/6792991879aa0a268e72bfbc/49c8b43b-5000-49a0-9c31-c7684ad3f7e4/Nadine%27s+Main+web+logo.png" alt="Logo" className="h-16" /> */}
        
        <div className="flex gap-6">
          <img src="/images/facebook.png" alt="Facebook" className="w-10 h-10"/>
          <img src="/images/instagram (1).png" alt="Instagram" className="w-10 h-10"/>
          <img src="/images/linkedin (1).png" alt="LinkedIn" className="w-10 h-10"/>
          <img src="/images/twitter (1).png" alt="Twitter" className="w-10 h-10"/>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />
      
      <nav className="flex justify-center gap-8 font-semibold text-lg">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <p className="text-center mt-4 text-sm text-gray-100">© 2026 Nadine's Meal DB. All rights reserved.</p>
    </footer>
  )
}


export default Footer