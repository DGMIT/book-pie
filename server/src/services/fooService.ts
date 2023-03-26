//3. 인사하는 기능을 만들고 주입가능하도록 export
import { injectable } from "inversify";

export interface IFooService {
    hello(str: string): void;
}

@injectable()
export class FooService implements IFooService{
    hello(str: string) {
        console.log(str);
    }
}
