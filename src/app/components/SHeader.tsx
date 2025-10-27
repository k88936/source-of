// 'use client';

import dynamic from 'next/dynamic';
import {cache} from "react";
// import alertService from '@jetbrains/ring-ui-built/components/alert-service/alert-service';

// Dynamically import Button component (this is a React component)
// const Button = dynamic(() => import('@jetbrains/ring-ui-built/components/button/button'), {
//   ssr: false,
// });

export default function SHeader() {
  return (
      <button>
          click me
      </button>
    // <Button 
    // //     onClick={() =>
    // //     alertService.successMessage('Hello world')
    // // }
    // >
    //   Click me
    // </Button>
  );
}