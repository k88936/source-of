'use client';

import Header, {HeaderIcon, Profile} from "@jetbrains/ring-ui-built/components/header/header";
import Logo from "@jetbrains/ring-ui-built/components/header/logo";
import Links from "@jetbrains/ring-ui-built/components/header/links";
import Tray from "@jetbrains/ring-ui-built/components/header/tray";
import alertService from "@jetbrains/ring-ui-built/components/alert-service/alert-service";
import Button from "@jetbrains/ring-ui-built/components/button/button";

export default function SHeader() {
    return (
        <Header
            className="header"
            spaced={false}
        >
            <a
                href="/"
                title="Hub"
            >
                <Logo
                    glyph="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;64&quot; height=&quot;64&quot; fill=&quot;none&quot; viewBox=&quot;0 0 64 64&quot;><defs><linearGradient id=&quot;teamcity_svg__a&quot; x1=&quot;7.671&quot; x2=&quot;61.126&quot; y1=&quot;64.393&quot; y2=&quot;39.609&quot; gradientUnits=&quot;userSpaceOnUse&quot;><stop offset=&quot;.1&quot; stop-color=&quot;#3BEA62&quot;></stop><stop offset=&quot;.59&quot; stop-color=&quot;#6B57FF&quot;></stop></linearGradient><linearGradient id=&quot;teamcity_svg__b&quot; x1=&quot;59.933&quot; x2=&quot;1.337&quot; y1=&quot;59.676&quot; y2=&quot;1.08&quot; gradientUnits=&quot;userSpaceOnUse&quot;><stop offset=&quot;.26&quot; stop-color=&quot;#6B57FF&quot;></stop><stop offset=&quot;.65&quot; stop-color=&quot;#07C3F2&quot;></stop></linearGradient></defs><path fill=&quot;#3BEA62&quot; d=&quot;M6 47.55v12.259a4.125 4.125 0 0 0 4.19 4.124l11.044-.176a4.125 4.125 0 0 0 3.066-1.44l32.707-38.158c.64-.748.993-1.7.993-2.685V10.125A4.125 4.125 0 0 0 53.875 6H42.872c-1.19 0-2.321.514-3.105 1.409L7.021 44.834A4.123 4.123 0 0 0 6 47.55Z&quot;></path><path fill=&quot;url(#teamcity_svg__a)&quot; d=&quot;M6 49.015v10.862a4.125 4.125 0 0 0 4.125 4.125h12.566c.2 0 .4-.014.598-.044l37.185-5.448A4.125 4.125 0 0 0 64 54.429V39.03a4.125 4.125 0 0 0-4.127-4.125l-18.504.005c-.426 0-.849.066-1.254.195L8.871 45.085A4.126 4.126 0 0 0 6 49.015H6Z&quot;></path><path fill=&quot;url(#teamcity_svg__b)&quot; d=&quot;M0 4.125v34.127c0 1.659.993 3.155 2.52 3.8L39.943 57.85c.518.219 1.075.33 1.638.324l18.329-.15A4.125 4.125 0 0 0 64 53.9V36.234c0-.806-.236-1.593-.678-2.267L42.213 1.86A4.125 4.125 0 0 0 38.766 0H4.125A4.125 4.125 0 0 0 0 4.125Z&quot;></path><path fill=&quot;#000&quot; d=&quot;M52 12H12v40h40V12Z&quot;></path><path fill=&quot;#fff&quot; d=&quot;M33 44H17v3h16v-3ZM16.003 16.992H28.04v2.637h-4.545V32h-2.927v-12.37h-4.566v-2.637ZM32.79 31.242a7.287 7.287 0 0 1-2.744-2.786c-.665-1.183-.997-2.503-.997-3.961s.332-2.778.997-3.96 1.58-2.112 2.743-2.787c1.165-.675 2.465-1.014 3.902-1.014 1.215 0 2.33.225 3.345.675a6.867 6.867 0 0 1 2.535 1.892 6.441 6.441 0 0 1 1.355 2.793h-3.065a4.036 4.036 0 0 0-2.326-2.38 4.896 4.896 0 0 0-1.822-.333c-.887 0-1.687.222-2.402.665a4.611 4.611 0 0 0-1.677 1.827c-.404.776-.606 1.649-.606 2.62 0 .973.202 1.846.606 2.621a4.607 4.607 0 0 0 1.677 1.828c.715.443 1.515.664 2.402.664.657 0 1.265-.11 1.822-.332a4.015 4.015 0 0 0 2.326-2.38h3.065a6.442 6.442 0 0 1-1.355 2.792 6.863 6.863 0 0 1-2.535 1.892c-1.015.45-2.13.675-3.345.675-1.436 0-2.736-.337-3.901-1.013v.003Z&quot;></path></svg>"
                />
            </a>
            <Button onClick={() => alertService.successMessage('Hello world')}>
                Click me
            </Button>
            <Tray>
                <HeaderIcon
                    icon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;20&quot; height=&quot;20&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 20 20&quot;><path fill-rule=&quot;evenodd&quot; d=&quot;M8.364 18.645a2 2 0 0 1-.36-1.145h4a2 2 0 0 1-3.64 1.145ZM5.937 10c0 .243-.056.482-.165.699l-1.994 3.989h12.444l-1.995-3.99a1.562 1.562 0 0 1-.165-.698V7.5c0-1.91-.626-3.029-1.343-3.683-.751-.685-1.758-1.002-2.71-1.004h-.006c-.951.002-1.962.319-2.717 1.006-.72.655-1.349 1.774-1.349 3.681V10ZM10 1.25h.012c2.542.005 5.613 1.679 5.613 6.25V10l2.245 4.491a1.215 1.215 0 0 1-1.087 1.759H3.216c-.903 0-1.49-.95-1.087-1.759L4.375 10V7.5c0-4.571 3.083-6.245 5.625-6.25Z&quot; clip-rule=&quot;evenodd&quot;/></svg>"
                    title="Notifications"
                />
                <HeaderIcon
                    icon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;20&quot; height=&quot;20&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 20 20&quot;><path fill-rule=&quot;evenodd&quot; d=&quot;M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm.086-12.686c.357 0 .668.114.932.343.264.229.396.514.396.857 0 .314-.096.593-.289.836a5.36 5.36 0 0 1-.653.686c-.329.285-.618.6-.868.942-.25.343-.375.729-.375 1.158 0 .2.075.367.225.503.15.136.325.204.525.204a.763.763 0 0 0 .546-.215.987.987 0 0 0 .29-.535c.057-.3.185-.568.385-.804.2-.236.415-.46.643-.675.329-.314.61-.657.847-1.028a2.28 2.28 0 0 0 .353-1.243c0-.729-.296-1.325-.89-1.79-.592-.464-1.281-.696-2.067-.696a3.65 3.65 0 0 0-1.554.343 2.396 2.396 0 0 0-1.125 1.05.773.773 0 0 0-.096.546c.036.193.132.34.29.44.2.114.406.15.62.107a.853.853 0 0 0 .536-.365 1.662 1.662 0 0 1 1.329-.664Zm-.129 8.829c.3 0 .554-.104.761-.311.207-.207.31-.46.31-.76s-.103-.554-.31-.761a1.034 1.034 0 0 0-.76-.311c-.3 0-.554.103-.761.31-.207.208-.311.461-.311.761s.104.554.31.761c.208.207.461.31.761.31Z&quot; clip-rule=&quot;evenodd&quot;/></svg>"
                    title="Help"
                />
                <Profile
                    round
                    user={{
                        id: '1',
                        login: 'john.doe',
                        name: 'John Doe'
                    }}
                />
            </Tray>
        </Header>);
}