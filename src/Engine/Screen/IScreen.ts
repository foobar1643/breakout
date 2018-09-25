interface IScreen {

    /**
     * Adds IScreen element to user-visible space on the actual screen.
     *
     * @param parentElementId
     */
    showScreen(parentElementId: string): void;

    /**
     * Checks whether IScreen element was added to user-visible space.
     */
    wasShown(): boolean;

    /**
     * Returns rendering context for current screen.
     */
    getRenderContext(): CanvasRenderingContext2D;
}
