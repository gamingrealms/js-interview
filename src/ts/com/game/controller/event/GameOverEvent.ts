class GameOverEvent extends EventObject {

    public static WIN:string = "GameOverEvent.WIN";
    public static LOSE:string = "GameOverEvent.LOSE";

    constructor(type:string) {
        super(type);
    }
}