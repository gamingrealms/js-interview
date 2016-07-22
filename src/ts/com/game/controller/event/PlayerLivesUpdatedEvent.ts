
class PlayerLivesUpdatedEvent extends EventObject {

    public static UPDATED:string = "PlayerLivesUpdatedEvent.UPDATED";

    constructor() {
        super(PlayerLivesUpdatedEvent.UPDATED);
    }
}