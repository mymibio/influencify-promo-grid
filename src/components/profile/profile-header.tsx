
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col items-center py-8">
      <Avatar className="h-24 w-24 mb-4">
        {user.profilePicture ? (
          <AvatarImage src={user.profilePicture} alt={user.name} />
        ) : (
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        )}
      </Avatar>
      
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-muted-foreground mt-1">@{user.username}</p>
      
      {user.bio && (
        <p className="text-center max-w-md mt-4">{user.bio}</p>
      )}
      
      {user.socialLinks && (
        <div className="flex gap-4 mt-6">
          {user.socialLinks.instagram && (
            <Link 
              to={`https://instagram.com/${user.socialLinks.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple transition-colors"
            >
              <Instagram size={20} />
            </Link>
          )}
          {user.socialLinks.youtube && (
            <Link 
              to={`https://youtube.com/${user.socialLinks.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple transition-colors"
            >
              <Youtube size={20} />
            </Link>
          )}
          {user.socialLinks.twitter && (
            <Link 
              to={`https://twitter.com/${user.socialLinks.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple transition-colors"
            >
              <Twitter size={20} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
