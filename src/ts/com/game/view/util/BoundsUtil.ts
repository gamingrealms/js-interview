class BoundsUtil {

    public static isInBounds(a:PIXI.Sprite, b:PIXI.Sprite):boolean {
        let aPoint:PIXI.Point = GraphicsUtil.globalPosition(a);
        let bPoint:PIXI.Point = GraphicsUtil.globalPosition(b);
        let rectangle:PIXI.Rectangle = new PIXI.Rectangle(aPoint.x, aPoint.y);
        return rectangle.contains(bPoint.x, bPoint.y);
    }

    public static globalPosition(object:PIXI.Sprite):PIXI.Point {
        return new PIXI.Point(object.worldTransform.tx, object.worldTransform.ty);
    }
}