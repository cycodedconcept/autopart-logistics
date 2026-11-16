import Link from "next/link";

const AuthFooter = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-16 py-6 text-base text-light-gray">
      <p>© {new Date().getFullYear()} AutoParts</p>
      <nav className="flex items-center gap-8">
        <Link href="#" className="hover:text-dark-gray">
          Terms of service
        </Link>
        <Link href="#" className="hover:text-dark-gray">
          Privacy policy
        </Link>
      </nav>
    </footer>
  );
};

export default AuthFooter;
