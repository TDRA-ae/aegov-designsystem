function showToast(options) {
    const toast = document.createElement('aegov-toast');
    if (options.variant)
        toast.variant = options.variant;
    if (options.appearance)
        toast.appearance = options.appearance;
    if (options.position)
        toast.position = options.position;
    if (options.duration !== undefined)
        toast.duration = options.duration;
    if (options.isDismissible !== undefined)
        toast.isDismissible = options.isDismissible;
    if (options.mode)
        toast.mode = options.mode;
    if (options.isProgressEnabled !== undefined)
        toast.isProgressEnabled = options.isProgressEnabled;
    toast.innerHTML = options.message;
    document.body.appendChild(toast);
    toast.show();
    return toast;
}
if (typeof window !== 'undefined') {
    window.aegovToast = { show: showToast };
}
export {};
