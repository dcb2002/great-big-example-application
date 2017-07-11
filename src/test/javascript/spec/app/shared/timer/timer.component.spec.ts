/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TimerComponent } from '../../../../../../main/webapp/app/shared/timer/timer.component';
import { TimerService } from '../../../../../../main/webapp/app/shared/timer/timer.service';
import { MockTimerService } from './mock-timer.service.spec';
import { GreatBigExampleApplicationSharedModule } from '../../../../../../main/webapp/app/shared/shared.module';
import { StatusBarService } from '../../../../../../main/webapp/app/shared/status-bar/status-bar.service';

describe('TimerComponent', () => {
    let component: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;
    let mockTimerService: MockTimerService;
    const config: Route[] = [
        { path: '', component: TimerComponent },
        { path: 'test', component: TimerComponent }
    ];
    beforeEach(async(() => {
        mockTimerService = new MockTimerService();
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(config),
                GreatBigExampleApplicationSharedModule
            ],
            declarations: [TimerComponent],
            providers: [
                StatusBarService,
                TimerService,
                { provide: TimerService, useValue: mockTimerService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
