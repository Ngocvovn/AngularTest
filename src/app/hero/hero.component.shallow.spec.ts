import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent (Shallow tests)", () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it("should render hero name in an anchor tag", () => {
    fixture.componentInstance.hero = { id: 1, name: "super", strength: 3 };
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css("a")).nativeElement.textContent
    ).toContain("super");
    //expect(fixture.nativeElement.querySelector('a').textContent).toContain('super');
  });
});
