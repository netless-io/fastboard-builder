import { register } from '@netless/fastboard/full';
import SlideApp, { addHooks } from "@netless/app-slide";
export * from '@netless/fastboard/full';

// 按需求集成特殊版本的 SlideApp
register({
    kind: "Slide",
    appOptions: { debug: false },
    src: SlideApp,
    addHooks,
});
