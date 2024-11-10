import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { Film, Wand2, GamepadIcon } from 'lucide-react';
import logo from '../assets/logo.png';
import emovieji from '../assets/emovieji.png';

export default function Navigation() {
  return (
    <Navbar className="bg-black/20 backdrop-blur-md">
      <NavbarBrand className="flex items-center gap-x-2">
        <img src={logo} alt="Movie Emojis Logo" className="w-8 h-8"/>
        <img src={emovieji} alt="EMOVIEJI" className="w-1/4"/>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/">
            <Button
              variant="light"
              startContent={<Wand2 className="w-4 h-4" />}
              className="text-white"
            >
              Convert
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/reverse">
            <Button
              variant="light"
              startContent={<Film className="w-4 h-4" />}
              className="text-white"
            >
              Reverse
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/game">
            <Button
              variant="light"
              startContent={<GamepadIcon className="w-4 h-4" />}
              className="text-white"
            >
              Game
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}