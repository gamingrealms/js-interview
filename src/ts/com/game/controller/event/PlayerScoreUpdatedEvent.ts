
class PlayerScoreUpdatedEvent extends EventObject {

    public static UPDATED:string = "PlayerScoreUpdatedEvent.UPDATED";

    constructor() {
        super(PlayerScoreUpdatedEvent.UPDATED);
    }
}