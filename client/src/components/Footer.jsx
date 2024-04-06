import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const FooterCom = () => {
  return (
    <Footer
      container
      className="rounded-none border-2 border-shadow-sm dark:border-none mt-10"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-3xl font-semibold dark:text-white"
          >
            <span className="px-6 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              1-Bit
            </span>
            Blog
          </Link>
          <div className="grid grid-cols-3 gap-8 mt-3 sm:mt-0 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Link to="/about" className="text-sm">
                  About
                </Link>
                <Link to="/blog" className="text-sm">
                  Blog
                </Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="HELP CENTER" />
              <Footer.LinkGroup col>
                <Footer.Link href="/contact">Contact Us</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex justify-center items-center sm:justify-between">
          <Footer.Copyright
            href="/"
            by="1-Bit coder blog"
            year={new Date().getFullYear()}
            className="hidden sm:block"
          />
          <div className="flex space-x-6 sm:mt-0 justify-between items-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
