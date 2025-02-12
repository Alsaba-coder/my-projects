import Link from "next/link";
import { FacebookIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Information Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/published-books" className="hover:text-primary">
                  Published Books
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-primary">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Profile Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Profile</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile/poet-writer" className="hover:text-primary">
                  Poet & Writer
                </Link>
              </li>
              <li>
                <Link href="/profile/professional-career" className="hover:text-primary">
                  Professional Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <address className="not-italic">
              <p>Email: contact@drrajeshkumar.com</p>
              <p>New Delhi, India</p>
            </address>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/gangeshwar.singh.1217" className="hover:text-primary">
                <FacebookIcon size={24} />
              </Link>
              <Link href="https://twitter.com/gangeshwarsingh" className="hover:text-primary">
                <TwitterIcon size={24} />
              </Link>
              <Link href="https://www.youtube.com/@gangeshwarsinghips814" className="hover:text-primary">
                <YoutubeIcon size={24} />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dr. Rajesh Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}