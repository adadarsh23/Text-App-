import React,{useState} from 'react'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


function Tab() {
  const [showBookmarksBar, setShowBookmarksBar] = useState(false);
  const [showFullURLs, setShowFullURLs] = useState(false); // State for "Always Show Full URLs"


  const toggleBookmarksBar = () => {
    setShowBookmarksBar(!showBookmarksBar);
    if (!showBookmarksBar) {
      alert("Bookmarks Bar is now visible.");
    } else {
      alert("Bookmarks Bar is now hidden.");
    }
  };
  const toggleFullURLs = () => {
    setShowFullURLs(!showFullURLs);
    if (!showFullURLs) {
      alert("Full URLs are now visible.");
    } else {
      alert("Full URLs are now hidden.");
    }
  };
  const openNewWindow = () => {
    window.open('/', '_blank', 'width=800,height=600');
  };
  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this website!',
          text: 'Here is a link to a great website:',
          url: window.location.href, // Current page URL
        })
        .then(() => console.log('Link shared successfully!'))
        .catch((error) => console.error('Error sharing link:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };
  const shareMessage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Message from the Website',
          text: 'Hello! This is a message shared from our website.',
          url: window.location.href, // Optional: Include the current page URL
        })
        .then(() => console.log('Message shared successfully!'))
        .catch((error) => console.error('Error sharing message:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };
  return (
    // <div class="text-light bg-dark">
    <div className='text-white bg-stone-800'>
      <Menubar className="w-auto" >
        <MenubarMenu >
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className='text-white bg-stone-800'>
            <a href="/" target='_blank' className='text-decoration-none'>
              <MenubarItem >
                New Tab
              </MenubarItem>
            </a>
            <a href="/" target="_blank" onClick={openNewWindow} rel="noopener noreferrer" className='text-decoration-none'>
              <MenubarItem>
                New Window
              </MenubarItem>
            </a>
            <a href="/" onClick={() => alert('Opening incognito mode is not supported programmatically.')} className='text-decoration-none' target="_blank">
              <MenubarItem >New Incognito Window</MenubarItem>
            </a>
            <MenubarSeparator />
            <MenubarSub>
              <a  className='text-decoration-none' ><MenubarSubTrigger  >Share</MenubarSubTrigger></a>
              <MenubarSubContent className='text-white bg-stone-800'>
                <a className='text-decoration-none' >
                  <MenubarItem onClick={shareLink} >Email link</MenubarItem></a>
                <a className='text-decoration-none' >
                  <MenubarItem onClick={shareMessage}>Messages</MenubarItem>
                </a>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent className='text-white bg-stone-800'>
          <a href="/" className="text-decoration-none">
              <MenubarCheckboxItem
                checked={showBookmarksBar}
                onCheckedChange={toggleBookmarksBar}
              >
                Always Show Bookmarks Bar
              </MenubarCheckboxItem>
            </a>
            <a href="/" className="text-decoration-none">
              <MenubarCheckboxItem
                checked={showFullURLs}
                onCheckedChange={toggleFullURLs}
              >
                Always Show Full URLs
              </MenubarCheckboxItem>
            </a>
            <MenubarSeparator />
            <a href="/" className="text-decoration-none">
              <MenubarItem inset onClick={() => window.location.reload()}>
                Reload
              </MenubarItem>
            </a>
            <a href="/" className="text-decoration-none">
              <MenubarItem inset onClick={() => window.location.href = window.location.href + '?cache_bust=' + new Date().getTime()}>
                Force Reload
              </MenubarItem>
             </a>{/*// fresh reload clear cache */}
            <MenubarSeparator />
            <a href="#" className="text-decoration-none">
              <MenubarItem inset onClick={() => document.documentElement.requestFullscreen()}>
                Toggle Fullscreen
              </MenubarItem>
            </a>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu className='text-white bg-stone-800'>
          <Sheet className='text-white bg-stone-800'>
            <MenubarTrigger>Profile</MenubarTrigger>
            <MenubarContent className='text-white bg-stone-800'>
              <MenubarItem>
                <SheetTrigger>Edit Profile</SheetTrigger>
              </MenubarItem>
            </MenubarContent>

            <SheetContent className='text-white bg-stone-800 w-[200px] sm:w-[340px]'>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </MenubarMenu>
      </Menubar>
      {showBookmarksBar && (
        <div className="bg-gray-700 text-white p-2">
          <p>Bookmarks Bar is visible here.</p>
        </div>
      )}
      {showFullURLs && (
        <div className="bg-gray-700 text-white p-2">
          <p>Full URLs are now visible.</p>
        </div>
      )}
    </div>
  )
}

export default Tab
