export default {
  computed: {
    /**
     * Selected disk
     * @returns {*}
     */
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    /**
     * Selected items
     * @returns {*}
     */
    selectedItems() {
      return this.$store.getters['fm/selectedItems'];
    },

    /**
     * Driver for selected disk
     * @returns {*}
     */
    selectedDiskDriver() {
      return this.$store.state.fm.disks[this.selectedDisk].driver;
    },

    /**
     * Multi selection
     * @returns {boolean}
     */
    multiSelect() {
      return this.$store.getters['fm/selectedItems'].length > 1;
    },

    /**
     * First item type - dir or file
     * @returns {*}
     */
    firstItemType() {
      return this.$store.getters['fm/selectedItems'][0].type;
    },
  },
  methods: {
    /**
     * Can we show this item?
     * @param extension
     * @returns {boolean}
     */
    canView(extension) {
      // расширение не найдено
      if (!extension) return false;

      return this.$store.state.fm.settings.imageExtensions.includes(extension.toLowerCase());
    },

    /**
     * Можно ли отредактировать этот файл в редакторе кода?
     * @param extension
     * @returns {boolean}
     */
    canEdit(extension) {
      // расширение не найдено
      if (!extension) return false;

      return Object.keys(this.$store.state.fm.settings.textExtensions)
        .includes(extension.toLowerCase());
    },

    /**
     * Мы можем воспроизвести этот аудиофайл?
     * @param extension
     * @returns {boolean}
     */
    canAudioPlay(extension) {
      // расширение не найдено
      if (!extension) return false;

      return this.$store.state.fm.settings.audioExtensions.includes(extension.toLowerCase());
    },

    /**
     * Мы можем воспроизвести этот видеофайл?
     * @param extension
     * @returns {boolean}
     */
    canVideoPlay(extension) {
      // расширение не найдено
      if (!extension) return false;

      return this.$store.state.fm.settings.videoExtensions.includes(extension.toLowerCase());
    },

    /**
     * Zip archive or not
     * @param extension
     * @returns {boolean}
     */
    isZip(extension) {
      // расширение не найдено
      if (!extension) return false;

      return extension.toLowerCase() === 'zip';
    },

    /**
     * Generate link for downloading selected file
     * @returns {string}
     */
    downloadLink() {
      return `${this.$store.getters['fm/settings/baseUrl']}download?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItems[0].path)}`;
    },
  },
};
