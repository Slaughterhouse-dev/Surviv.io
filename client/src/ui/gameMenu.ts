import $ from "jquery";

export class GameMenu {
    isActive = false;
    menuElement: JQuery;

    constructor() {
        // Создаем HTML для игрового меню
        this.menuElement = this.createMenuHTML();
        
        // Обработчики для кнопок
        this.setupButtons();
        this.setupInteractions();
    }

    private createMenuHTML(): JQuery {
        // Проверяем, не существует ли уже меню
        if ($("#game-menu").length > 0) {
            return $("#game-menu");
        }

        const menuHTML = `
            <div id="game-menu" class="modal" style="display: none;">
                <div class="modal-content game-menu-content">
                    <!-- Sidebar -->
                    <div class="game-menu-sidebar">
                        <!-- Logo -->
                        <div class="sidebar-logo">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                            </svg>
                        </div>
                        
                        <div class="sidebar-divider"></div>
                        
                        <div class="sidebar-item active" data-tab="main">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2"></path>
                            </svg>
                        </div>
                        <div class="sidebar-item" data-tab="combat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                                <line x1="16" y1="8" x2="2" y2="22"></line>
                                <line x1="17.5" y1="15" x2="9" y2="15"></line>
                            </svg>
                        </div>
                        <div class="sidebar-item" data-tab="visual">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <div class="sidebar-item" data-tab="player">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div class="sidebar-item" data-tab="misc">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="15" y2="9"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <div class="sidebar-item" data-tab="info">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="game-menu-main">
                        <!-- Header -->
                        <div class="modal-header">
                            <h2>Game Settings</h2>
                            <div class="header-search">
                                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input type="text" class="search-input" placeholder="Search settings...">
                            </div>
                            <button class="close">✕</button>
                        </div>

                        <!-- Content Area -->
                        <div class="modal-body">
                            <!-- Main Tab -->
                            <div class="tab-content active" data-content="main">
                                <div class="section-header">UI Components</div>
                                
                                <!-- Checkbox -->
                                <div class="setting-item">
                                    <div class="setting-label">Checkbox</div>
                                    <label class="checkbox-container">
                                        <input type="checkbox" checked>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>

                                <!-- Slider -->
                                <div class="setting-item">
                                    <div class="setting-label">Range Slider</div>
                                    <div class="slider-container">
                                        <input type="range" class="custom-slider" min="0" max="100" value="75">
                                        <span class="slider-value">75%</span>
                                    </div>
                                </div>

                                <!-- Dropdown -->
                                <div class="setting-item">
                                    <div class="setting-label">Dropdown Select</div>
                                    <select class="custom-dropdown">
                                        <option value="option1">Option 1</option>
                                        <option value="option2" selected>Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </select>
                                </div>

                                <!-- Color Picker -->
                                <div class="setting-item">
                                    <div class="setting-label">Color Picker</div>
                                    <div class="color-picker-wrapper">
                                        <input type="color" class="color-input" value="#0F4A38">
                                        <input type="text" class="color-hex" value="#0F4A38" readonly>
                                    </div>
                                </div>

                                <!-- Text Input -->
                                <div class="setting-item">
                                    <div class="setting-label">Text Input</div>
                                    <input type="text" class="custom-input" placeholder="Enter text...">
                                </div>

                                <!-- Number Input -->
                                <div class="setting-item">
                                    <div class="setting-label">Number Input</div>
                                    <input type="number" class="custom-input" value="100" min="0" max="999">
                                </div>
                            </div>

                            <!-- Combat Tab (Empty) -->
                            <div class="tab-content" data-content="combat">
                                <div class="section-header">Combat Settings</div>
                                <div class="empty-tab">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                                        <line x1="16" y1="8" x2="2" y2="22"></line>
                                    </svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Visual Tab (Empty) -->
                            <div class="tab-content" data-content="visual">
                                <div class="section-header">Visual Settings</div>
                                <div class="empty-tab">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Player Tab (Empty) -->
                            <div class="tab-content" data-content="player">
                                <div class="section-header">Player Settings</div>
                                <div class="empty-tab">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Misc Tab (Empty) -->
                            <div class="tab-content" data-content="misc">
                                <div class="section-header">Miscellaneous</div>
                                <div class="empty-tab">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="9" y1="9" x2="15" y2="9"></line>
                                        <line x1="9" y1="15" x2="15" y2="15"></line>
                                    </svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Info Tab (Empty) -->
                            <div class="tab-content" data-content="info">
                                <div class="section-header">Information</div>
                                <div class="empty-tab">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("body").append(menuHTML);
        return $("#game-menu");
    }

    private setupButtons() {
        const closeBtn = this.menuElement.find(".close");
        
        closeBtn.on("click", () => {
            this.hide();
        });

        $("#game-reset").on("click", () => {
            console.log("Reset to default settings");
            // Здесь можно добавить логику сброса настроек
        });

        $("#game-exit").on("click", () => {
            console.log("Exit game");
            this.hide();
            // Здесь можно добавить логику выхода из игры
        });

        // Предотвращаем закрытие меню при клике на оверлей
        this.menuElement.on("click", (e) => {
            if (e.target === this.menuElement[0]) {
                // Клик по оверлею - ничего не делаем
                e.stopPropagation();
            }
        });

        // Предотвращаем всплытие событий из контента меню
        this.menuElement.find(".game-menu-content").on("click", (e) => {
            e.stopPropagation();
        });
    }

    private setupInteractions() {
        // Tab switching
        $(".sidebar-item").on("click", function() {
            const tab = $(this).data("tab");
            
            $(".sidebar-item").removeClass("active");
            $(this).addClass("active");
            
            $(".tab-content").removeClass("active");
            $(`.tab-content[data-content="${tab}"]`).addClass("active");
        });

        // Sliders
        $(".custom-slider").on("input", function() {
            const value = $(this).val();
            $(this).siblings(".slider-value").text(value + ($(this).attr("id")?.includes("volume") ? "%" : ""));
        });

        // Color pickers
        $(".color-input").on("input", function() {
            const color = $(this).val();
            $(this).siblings(".color-hex").val(color as string);
        });

        // Search functionality
        $(".search-input").on("input", function() {
            const searchTerm = $(this).val() as string;
            const lowerSearch = searchTerm.toLowerCase();
            
            if (searchTerm.length === 0) {
                $(".setting-item").show();
                return;
            }
            
            $(".setting-item").each(function() {
                const label = $(this).find(".setting-label").text().toLowerCase();
                if (label.includes(lowerSearch)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }

    show() {
        if (!this.isActive) {
            this.isActive = true;
            this.menuElement.fadeIn(200);
            
            // Блокируем взаимодействие с игрой
            this.blockGameInteraction();
        }
    }

    hide() {
        if (this.isActive) {
            this.isActive = false;
            this.menuElement.fadeOut(200);
            
            // Разблокируем взаимодействие с игрой
            this.unblockGameInteraction();
        }
    }

    private blockGameInteraction() {
        // Блокируем canvas игры от получения событий
        const canvas = document.getElementById("cvs") as HTMLCanvasElement;
        if (canvas) {
            canvas.style.pointerEvents = "none";
        }

        // Блокируем игровую область от касаний
        const gameArea = document.getElementById("game-touch-area");
        if (gameArea) {
            gameArea.style.pointerEvents = "none";
        }

        // Добавляем класс для блокировки
        document.body.classList.add("game-menu-open");
    }

    private unblockGameInteraction() {
        // Разблокируем canvas игры
        const canvas = document.getElementById("cvs") as HTMLCanvasElement;
        if (canvas) {
            canvas.style.pointerEvents = "auto";
        }

        // Разблокируем игровую область
        const gameArea = document.getElementById("game-touch-area");
        if (gameArea) {
            gameArea.style.pointerEvents = "auto";
        }

        // Убираем класс блокировки
        document.body.classList.remove("game-menu-open");
    }

    toggle() {
        if (this.isActive) {
            this.hide();
        } else {
            this.show();
        }
    }

    isVisible() {
        return this.isActive;
    }
}
